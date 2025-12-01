"use client";
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { supabase, hasSupabase } from '../../lib/supabase';
import { styles } from '../../utils/svgStyles';
import { useRouter } from 'next/navigation';
import HeaderBar from '../../components/Home/HeaderBar';
import TemplatePreview from '../../components/Home/TemplatePreview';
import ThemeControls from '../../components/Home/ThemeControls';
import SortControls from '../../components/Home/SortControls';
import TypeControls from '../../components/Home/TypeControls';
import FooterActions from '../../components/Home/FooterActions';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null;
  is_template: boolean;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
}

interface Filters {
  theme: 'dark' | 'light';
  invertColors: boolean;
  sort: 'stars' | 'created' | 'updated' | 'full_name';
  order: 'asc' | 'desc';
  type: string[];
}

const defaultFilters: Filters = { theme: 'dark', invertColors: false, sort: 'stars', order: 'asc', type: ['owner'] } as const;

async function safeFetchJson<T = any>(input: string | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

function formatRepositories(repositories: any[]): Repo[] {
  return repositories.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    homepage: item.homepage,
    is_template: item.is_template,
    language: item.language,
    stargazers_count: item.stargazers_count,
    topics: item.topics,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
}

async function toDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao carregar asset: ${url}`);
  const blob = await res.blob();
  return await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export default function HomePage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [info, setInfo] = useState<any>({});
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [filterRepositories, setFilterRepositories] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  if (!auth) return null;
  const { state, dispatch } = auth;

  useEffect(() => {
    if (!state.isLoggedIn) router.replace('/');
  }, [state.isLoggedIn, router]);

  useEffect(() => {
    if (!info?.repos_url) return;
    handleApplyFilters().catch((e) => {
      console.error(e);
      toast.error(e.message);
    });
  }, [filters.sort, filters.order, filters.type]);

  useEffect(() => {
    const manual = state?.githubUsername;
    if (manual) {
      setUsername(manual);
      return;
    }
    (async () => {
      try {
        const token = await getSession();
        if (!token) return;
        const oauthName = await getOAuthUsername(token);
        if (oauthName) setUsername(oauthName);
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    })();
  }, [state?.githubUsername]);

  useEffect(() => {
    if (!username) return;
    (async () => {
      try {
        const data = await safeFetchJson<any>('https://api.github.com/users/' + username);
        setInfo({
          bio: data.bio,
          blog: data.blog,
          company: data.company,
          followers: data.followers,
          public_repos: data.public_repos,
          repos_url: data.repos_url,
          twitter_username: data.twitter_username,
        });
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    })();
  }, [username]);

  useEffect(() => {
    if (!info?.repos_url) return;
    (async () => {
      try {
        const data = await safeFetchJson<any[]>(info.repos_url);
        const ordered = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
        const formatted = formatRepositories(ordered);
        setRepositories(formatted);
        setFilterRepositories(formatted.map((i) => i.name));
      } catch (error: any) {
        console.error(error);
        toast.error(error.message);
      }
    })();
  }, [info]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, invertColors: state.theme === 'dark' }));
  }, [state.theme]);

  const getSession = async () => {
    try {
      if (!hasSupabase || !supabase) return null;
      const { data, error } = await supabase.auth.getSession();
      if (error) throw new Error(error.message);
      return data.session?.access_token;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      return null;
    }
  };

  const getOAuthUsername = async (accessToken: string) => {
    try {
      if (!hasSupabase || !supabase) return null;
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (error) throw new Error(error.message);
      return (data.user.user_metadata as any).preferred_username as string;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      if (hasSupabase && supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) throw new Error(error.message);
      }
      dispatch({ type: 'LOGOUT' });
      router.replace('/');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleDownloadSvg = async (templateId: string) => {
    const svg = document.getElementById(templateId) as SVGSVGElement | null;
    if (!svg) {
      console.error('svg not found');
      return;
    }

    const canvas = document.createElement('canvas');
    const width = svg.clientWidth || 500;
    const height = svg.clientHeight || 650;
    canvas.width = width;
    canvas.height = height;

    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('width', String(width));
    clone.setAttribute('height', String(height));

    const ns = 'http://www.w3.org/2000/svg';
    let styleTag = clone.querySelector('style') as SVGStyleElement | null;
    let defs = clone.querySelector('defs') as SVGDefsElement | null;
    if (!defs) {
      defs = document.createElementNS(ns, 'defs') as SVGDefsElement;
      clone.insertBefore(defs, clone.firstChild);
    }
    if (!styleTag) {
      styleTag = document.createElementNS(ns, 'style') as SVGStyleElement;
      defs.appendChild(styleTag);
    }

    try {
      const [bebasDataUrl, lolaDataUrl] = await Promise.all([
        toDataUrl('/fonts/BebasKai.otf'),
        toDataUrl('/fonts/Lolapeluza.ttf'),
      ]);
      let css = (styles as any).template1 as string;
      css = css.replace("url('../fonts/BebasKai.otf')", `url(${bebasDataUrl})`);
      css = css.replace("url('../fonts/Lolapeluza.ttf')", `url(${lolaDataUrl})`);
      styleTag!.textContent = css;
    } catch (e) {
      console.error('Falha ao embutir fontes no SVG:', e);
    }

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(clone);
    if (!source.match(/^<svg[^>]+xmlns=\"http:\/\/www\\.w3\\.org\/2000\/svg\"/)) source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    if (!source.match(/^<svg[^>]+\"http:\/\/www\\.w3\\.org\/1999\/xlink\"/)) source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, width, height);
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const a = document.createElement('a');
      a.download = 'dark-template.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.onerror = function () {
      const a = document.createElement('a');
      a.download = 'dark-template.svg';
      a.href = url;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    };
    img.src = url;
  };

  const handleFilterType = (type: string) => {
    setFilters((prev) => {
      const exists = prev.type.includes(type);
      const next = exists ? prev.type.filter((t) => t !== type) : [...prev.type, type];
      return { ...prev, type: next.length === 0 ? ['owner'] : next };
    });
  };

  const handleApplyFilters = async () => {
    const { type, order, sort } = filters;
    if (!info?.repos_url) return;
    const url = new URL(info.repos_url);
    url.searchParams.set('direction', order);
    if (sort !== 'stars') url.searchParams.set('sort', sort);
    url.searchParams.set('type', type.length === 1 ? type[0] : 'all');
    let data = await safeFetchJson<any[]>(url);
    if (sort === 'stars') data = data.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
    const formatted = formatRepositories(data);
    setFilterRepositories(formatted.map((item) => item.name));
  };

  const clearFilters = () => setFilters(defaultFilters);

  if (!username) {
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <div className='flex justify-center items-center flex-col'>
          <div className='inline-block h-8 w-8 animate-spin rounded-full text-primary-400 border-4 border-solid border-current border-r-transparent'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderBar username={username} bio={info.bio} onLogout={handleLogout} />
      <hr className='border-gray-50 border-solid border-t-2 dark:border-zinc-800' />
      <section className='bg-white grid grid-cols-1 px-6 py-10 w-screen min-h-[90vh] md:grid-cols-2 dark:bg-zinc-900'>
        <TemplatePreview
          username={username}
          data={filterRepositories}
          invertColors={filters.invertColors}
          onDownload={() => handleDownloadSvg('dark-template')}
        />
        <div className='flex justify-between items-start flex-col gap-10 mt-4 md:justify-evenly md:gap-0 md:mt-0'>
          <ThemeControls filters={filters} setFilters={setFilters} />
          <SortControls filters={filters} setFilters={setFilters} />
          <TypeControls selected={filters.type} onToggle={handleFilterType} />
          <FooterActions onClear={clearFilters} onDownload={() => handleDownloadSvg('dark-template')} />
        </div>
      </section>
    </>
  );
}

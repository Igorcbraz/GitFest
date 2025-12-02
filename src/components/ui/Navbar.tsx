import React, { useState } from 'react'

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  logoText?: string;
  logoHref?: string;
  navItems?: NavItem[];
  rightContent?: React.ReactNode;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  (
    {
      logo,
      logoText = 'GitFest',
      logoHref = '/',
      navItems = [],
      rightContent,
      className = '',
      sticky = true,
      transparent = false,
    },
    ref
  ) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const navbarClasses = `
      w-full z-50 transition-all duration-base
      ${sticky ? 'sticky top-0' : ''}
      ${transparent ? 'bg-transparent backdrop-blur-strong' : 'bg-background-surface shadow-md'}
      ${className}
    `.trim()

    return (
      <nav ref={ref} className={navbarClasses}>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/*Logo e nome */}
            <div className='flex items-center gap-2 flex-shrink-0'>
              <a
                href={logoHref}
                className='flex items-center gap-2 text-text-primary hover:text-primary-600 transition-colors'
              >
                {logo && <div className='w-8 h-8'>{logo}</div>}
                <span className='text-lg font-semibold'>{logoText}</span>
              </a>
            </div>

            {/*Menu desktop */}
            <div className='hidden md:flex items-center gap-6'>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className='flex items-center gap-2 text-sm text-text-primary hover:text-primary-600 transition-colors'
                >
                  {item.icon && <span className='w-5 h-5'>{item.icon}</span>}
                  {item.label}
                </a>
              ))}
            </div>

            {/*Conteúdo direito (ex: botões, user menu) */}
            <div className='hidden md:flex items-center gap-4'>
              {rightContent}
            </div>

            {/*Botão do menu mobile */}
            <div className='md:hidden'>
              <button
                onClick={toggleMobileMenu}
                className='p-2 rounded-lg text-text-primary hover:bg-background-muted transition-colors'
                aria-label='Toggle menu'
              >
                {isMobileMenuOpen ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 6h16M4 12h16M4 18h16'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/*Menu mobile */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-border bg-background-surface'>
            <div className='container mx-auto px-4 py-4 flex flex-col gap-4'>
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className='flex items-center gap-2 text-text-primary hover:text-primary-600 py-2 transition-colors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon && <span className='w-5 h-5'>{item.icon}</span>}
                  {item.label}
                </a>
              ))}
              {rightContent && (
                <div className='pt-4 border-t border-border flex flex-col gap-2'>
                  {rightContent}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    )
  }
)

Navbar.displayName = 'Navbar'

export interface NavbarSimpleProps {
  children: React.ReactNode;
  className?: string;
  sticky?: boolean;
  transparent?: boolean;
}

const NavbarSimple = React.forwardRef<HTMLElement, NavbarSimpleProps>(
  ({ children, className = '', sticky = true, transparent = false }, ref) => {
    const navbarClasses = `
      w-full z-50 transition-all duration-base
      ${sticky ? 'sticky top-0' : ''}
      ${transparent ? 'bg-transparent backdrop-blur-strong' : 'bg-background-surface shadow-md'}
      ${className}
    `.trim()

    return (
      <nav ref={ref} className={navbarClasses}>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {children}
          </div>
        </div>
      </nav>
    )
  }
)

NavbarSimple.displayName = 'NavbarSimple'

const NavbarLogo = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    logo?: React.ReactNode;
    text?: string;
  }
>(({ logo, text, className = '', href = '/', ...props }, ref) => (
  <a
    ref={ref}
    href={href}
    className={`flex items-center gap-2 text-text-primary hover:text-primary-600 transition-colors ${className}`}
    {...props}
  >
    {logo && <div className='w-8 h-8'>{logo}</div>}
    {text && <span className='text-lg font-semibold'>{text}</span>}
  </a>
))

NavbarLogo.displayName = 'NavbarLogo'

const NavbarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`hidden md:flex items-center gap-6 ${className}`}
    {...props}
  >
    {children}
  </div>
))

NavbarMenu.displayName = 'NavbarMenu'

const NavbarActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center gap-4 ${className}`}
    {...props}
  >
    {children}
  </div>
))

NavbarActions.displayName = 'NavbarActions'

const NavbarLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon?: React.ReactNode;
    external?: boolean;
  }
>(({ icon, external, children, className = '', ...props }, ref) => (
  <a
    ref={ref}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={`flex items-center gap-2 text-sm text-text-primary hover:text-primary-600 transition-colors ${className}`}
    {...props}
  >
    {icon && <span className='w-5 h-5'>{icon}</span>}
    {children}
  </a>
))

NavbarLink.displayName = 'NavbarLink'

export {
  Navbar,
  NavbarSimple,
  NavbarLogo,
  NavbarMenu,
  NavbarActions,
  NavbarLink,
}

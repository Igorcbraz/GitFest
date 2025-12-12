import React, { Fragment } from 'react'

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Dialog({ open, onClose, children }: DialogProps) {
  if (!open) return null
  return (
    <Fragment>
      <div className='fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in' onClick={onClose} />
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
        <div className='relative' onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Fragment>
  )
}

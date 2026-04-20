function GoogleIcon() {
  return (
    <svg aria-hidden='true' className='h-4.5 w-4.5 shrink-0' viewBox='0 0 18 18' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M17.64 9.2045C17.64 8.56634 17.5827 7.95273 17.4764 7.36359H9V10.8454H13.8436C13.635 11.97 13.0018 12.9232 12.0486 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.2045Z'
        fill='#4285F4'
      />
      <path
        d='M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0486 13.5614C11.2427 14.1014 10.2114 14.4205 9 14.4205C6.65682 14.4205 4.67682 12.8373 3.96955 10.71H0.963182V13.0418C2.44409 15.9827 5.48682 18 9 18Z'
        fill='#34A853'
      />
      <path
        d='M3.96955 10.71C3.78955 10.17 3.68727 9.59318 3.68727 9C3.68727 8.40682 3.78955 7.83 3.96955 7.29V4.95818H0.963182C0.352955 6.17318 0 7.54773 0 9C0 10.4523 0.352955 11.8268 0.963182 13.0418L3.96955 10.71Z'
        fill='#FBBC05'
      />
      <path
        d='M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48682 0 2.44409 2.01727 0.963182 4.95818L3.96955 7.29C4.67682 5.16273 6.65682 3.57955 9 3.57955Z'
        fill='#EA4335'
      />
    </svg>
  )
}

function GoogleAuthButton({ onClick, children = 'Continue with Google' }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='flex h-10 cursor-pointer w-full items-center justify-center gap-3 rounded-md border border-[#dadce0] bg-white px-3 text-[14px] font-medium leading-5 tracking-[0.25px] text-[#3c4043] transition-colors hover:bg-[#f8f9fa] active:bg-[#f1f3f4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]/40 disabled:cursor-not-allowed disabled:opacity-60'
      style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
      aria-label='Continue with Google'
    >
      <GoogleIcon />
      <span>{children}</span>
    </button>
  )
}

export default GoogleAuthButton

import TextInput from '~/ui/text-input'

// import { ThemeDropdown } from '~/widgets/theme'

export default function TextInputPage(): JSX.Element {
  return (
    <main className='pt-5rem'>
      <div
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
      >
        <h2 className='mb-2rem'>TextInput</h2>
        <div className='mt-1rem'>
          <label htmlFor='s' className='label ml-0.25rem'>
            S | L
          </label>
          <TextInput rootProps={{ className: 'mt-0.5rem' }} id='s' autoComplete='off' height='s' />
          <TextInput rootProps={{ className: 'mt-0.5rem' }} id='l' autoComplete='off' height='l' />
        </div>
        <div className='mt-0.5rem'>
          <label htmlFor='default' className='label ml-0.25rem'>
            Default
          </label>
          <TextInput rootProps={{ className: 'mt-0.5rem' }} id='default' autoComplete='off' defaultValue='Default' />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='error' className='label ml-0.25rem'>
            Error
          </label>
          <TextInput
            rootProps={{ className: 'mt-0.5rem' }}
            id='error'
            isError={true}
            autoComplete='off'
            defaultValue='Error'
          />
        </div>
        <div className='mt-1rem'>
          <label
            htmlFor='disabled'
            className='label ml-0.25rem'
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role='button'
          >
            Disabled
          </label>
          <TextInput
            rootProps={{ className: 'mt-0.5rem' }}
            id='disabled'
            disabled={true}
            autoComplete='off'
            value='Disabled'
          />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='readonly' className='label ml-0.25rem'>
            Readonly
          </label>
          <TextInput
            rootProps={{ className: 'mt-0.5rem' }}
            id='readonly'
            readOnly={true}
            autoComplete='off'
            value='Readonly'
          />
        </div>
        <div className='mt-1rem'>
          <label htmlFor='readonly' className='label ml-0.25rem'>
            Borderless & Transparent
          </label>
          <TextInput
            borderless={true}
            transparent={true}
            rootProps={{ className: 'mt-0.5rem' }}
            id='borderless'
            autoComplete='off'
            value='Borderless'
          />
        </div>
      </div>
    </main>
  )
}

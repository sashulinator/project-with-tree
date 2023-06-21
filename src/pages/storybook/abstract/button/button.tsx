// import Callout, { top } from '~/ui/callout'
import Button from '~/ui/unstyled-button'

export default function ButtonPage(): JSX.Element {
  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{
          borderRadius: '20px',
          border: '1px solid var(--input_borderColor)',
          width: '100%',
        }}
      >
        <h2 className='mb-2rem'>Balloon</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>
          <div>
            <div className='pb-2rem'>
              <label htmlFor='placement' className='label mb-0.3rem mr-0.5rem'>
                Placement
              </label>
              <Button>Button</Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

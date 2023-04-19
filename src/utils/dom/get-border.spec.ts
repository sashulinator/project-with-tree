import { getBorder } from './get-border'

describe(getBorder.name, () => {
  it('margin', async () => {
    const div = document.createElement('div')
    div.style.border = '4px solid black'
    const style = getComputedStyle(div)
    expect(getBorder(style, ['Left'])).toBe(4)
    div.remove()
  })
  it('padding', async () => {
    const div = document.createElement('div')
    div.style.border = '4px solid black'
    const style = getComputedStyle(div)
    expect(getBorder(style, ['Left', 'Right'])).toBe(8)
    div.remove()
  })
})

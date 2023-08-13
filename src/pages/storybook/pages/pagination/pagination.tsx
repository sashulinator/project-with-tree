import './pagination.css'
import Flex from '~/abstract/flex/ui/flex'

import Section from '../../ui/section/ui/section'
import { DataPag, data } from './mock'
import { useEffect, useState } from 'react'
import Pagination from '~/ui/pagination'
import Input from '~/ui/input'
import Field from '~/abstract/field/ui/field'
import { H2 } from '~/ui/heading'

export default function PaginationPage(): JSX.Element {
  // блок со списком
  const [arr, setArr] = useState<DataPag[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  function getCurrentPage(item: number): void {
    setCurrentPage(item)
  }

  useEffect(() => {
    const result = data.slice(parseInt(`${currentPage - 1}0`), parseInt(`${currentPage}0`))
    setArr(result)
  }, [currentPage])

  // блок без списка
  const [currentPage2, setCurrentPage2] = useState(1)
  const [totalCount2, setTotalCount] = useState(10)

  function getCurrentPage2(item: number): void {
    setCurrentPage2(item)
  }

  return (
    <Flex dir='column'>
      <Section h1='Pagination' description='Пагинация'>
        <Flex dir='column'>
          <H2>Количество элементов в списке</H2>
          <Field style={{ marginBottom: '40px' }}>
            <Input
              type='number'
              value={totalCount2}
              onChange={(e): void => setTotalCount(parseInt(e.target.value))}
              placeholder='TotalCount'
            />
          </Field>

          {totalCount2 > 10 && (
            <Pagination onPageChange={getCurrentPage2} totalCount={totalCount2} currentPage={currentPage2} />
          )}
        </Flex>
      </Section>

      <Section h1='Pagination' description='Пагинация'>
        <Flex dir='column'>
          <Pagination
            rootProps={{ style: { marginBottom: '30px' } }}
            onPageChange={getCurrentPage}
            totalCount={data.length}
            currentPage={currentPage}
          />
          <ul style={{ width: '100%' }}>
            {arr.map((item) => (
              <li
                style={{
                  margin: '10px 0',
                  padding: '5px',
                  borderRadius: '10px',
                  border: '2px solid aqua',
                  width: '100%',
                }}
                key={item.id}
              >
                <span style={{ marginRight: '10px' }}>{item.id}</span>
                {item.body}
              </li>
            ))}
          </ul>
        </Flex>
      </Section>
    </Flex>
  )
}

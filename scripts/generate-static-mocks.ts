const fs = require('fs')
const path = require('path')

const MOCKS_FOLDER = 'src/mocks'
const STATIC_MOCKS_FOLDER = 'mocks'

// Удаляем старые моки
fs.rm(path.join(`${__dirname}/../${STATIC_MOCKS_FOLDER}`), { recursive: true, force: true }, (err) => {
  if (err) throw err

  // Получаем сущности
  fs.readdir(MOCKS_FOLDER, (err, entitieNames) => {
    if (err) throw err

    entitieNames.forEach((entityName) => {
      if (entityName === 'deprecated') return

      // Получаем IDишки сущностей
      fs.readdir(`${MOCKS_FOLDER}/${entityName}`, async (err, recordNames) => {
        if (err) throw err

        recordNames.forEach(async (recordName) => {
          const record = await import(`../${MOCKS_FOLDER}/${entityName}/${recordName}`)

          // Проверяем существует ли путь для статических моков
          fs.mkdir(
            path.join(`${__dirname}/../${STATIC_MOCKS_FOLDER}/${entityName}`),
            { recursive: true },
            function (err) {
              if (err) throw err

              // Пишем обьект в JSON файл
              fs.writeFileSync(
                path.join(
                  `${__dirname}/../${STATIC_MOCKS_FOLDER}/${entityName}/${recordName
                    .toString()
                    .replace(/\.ts$/, '.json')}`
                ),
                JSON.stringify(record.default, null, 2),
                'utf-8'
              )
            }
          )
        })
      })
    })
  })
})

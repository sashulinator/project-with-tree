export default {
  id: 'v2mockId1',
  rev: '1-242ad841aac3d82e5e94464504e16393',
  name: 'surveys_start',
  description: 'surveys start',
  createDttm: '2023-07-12T12:15:00.000',
  updateDttm: '2023-07-12T12:15:00.000',

  decisionTree: [
    {
      level: 'main',
      id: 'm1',
      x: 0,
      y: 0,
      children: [
        {
          id: 'a1',
        },
      ],
    },
    {
      level: 'arbitration',
      name: 'Арбитраж 1',
      id: 'a1',
      maxOffers: 1,
      x: 0,
      y: 0,
      sortDesc: 'desc',
      arbFormula: 'communications.baseParams.OfferPriority',
      children: [
        {
          id: 'cg1',
        },
      ],
    },
    {
      level: 'controlGroup',
      id: 'cg1',
      x: 0,
      y: 0,
      name: 'Выделение КГ',
      partitionType: 'syrveys_start_1',
      percentCg: 5,
      children: [
        {
          id: 'dp1',
        },
      ],
    },
    {
      level: 'decisionPoint',
      name: 'Базовые условия',
      x: 0,
      y: 0,
      id: 'dp1',
      mode: 'any',
      index: 2,
      children: [
        {
          id: 'dp2',
          rules: [
            {
              level: 'rule',
              name: 'r_client',
              id: 'r1',
              index: 1,
              value: 'Data.context.CLIENT_ID != null',
            },
          ],
        },
      ],
    },
    {
      level: 'decisionPoint',
      name: 'Разделение',
      id: 'dp2',
      x: 0,
      y: 0,
      mode: 'any',
      children: [
        {
          id: 'dp3',
          rules: [
            {
              level: 'rule',
              name: 'r_product_plus',
              id: 'r1',
              index: 1,
              value: "Data.context.ProductNm == 'КП Плюс'",
            },
          ],
        },
        {
          id: 'dp4',
          rules: [
            {
              level: 'rule',
              name: 'r_product_ozon',
              id: 'r1',
              index: 2,
              value: "Data.context.ProductNm == 'КП Озон'",
            },
          ],
        },
        {
          id: 'o3',
          rules: [
            {
              level: 'rule',
              name: 'r_product_yandex',
              id: 'r1',
              index: 3,
              value: "Data.context.ProductNm == 'Яндекс'",
            },
          ],
        },
      ],
    },
    {
      level: 'decisionPoint',
      name: 'Прайм',
      x: 0,
      y: 0,
      id: 'dp3',
      mode: 'any',
      children: [
        {
          id: 'o1',
          rules: [
            {
              level: 'rule',
              name: 'r_prime',
              id: 'r1',
              index: 1,
              value: "Data.EpaProfile.PackDsc == 'Прайм'",
            },
          ],
        },
        {
          id: 'dp4',
          rules: [
            {
              level: 'rule',
              name: 'r_prime',
              id: 'r1',
              index: 2,
              value: "Data.EpaProfile.PackDsc == 'Прайм'",
            },
          ],
        },
      ],
    },
    {
      level: 'decisionPoint',
      name: 'КП Искл',
      id: 'dp4',
      x: 0,
      y: 0,
      mode: 'any',
      children: [
        {
          id: 'o2',
          rules: [
            {
              level: 'rule',
              name: 'r_product_ozon',
              id: 'r1',
              index: 1,
              value: "Data.EpaProfile.PackDsc != 'Привилегия'",
            },
          ],
        },
      ],
    },
    {
      level: 'offer',
      name: 'Оффер +',
      x: 0,
      y: 0,
      id: 'o1',
      baseParams: {
        offerId: '1101',
        messageID: 'gfhto-245gh-698hg-679kj',
      },
      ossParams: {
        score: 1,
        channelCode: 'SMS',
        offerDesc: 'Предложение для клиентов использующих плюс',
        templateId: 254123,
        OfferPriority: 10,
        calcParams: {
          firstName: 'Data.Person.firstName',
          contactDttm: 'java.time.LocalDateTime.now().toEpochSecond(java.time.ZoneOffset.UTC)',
        },
      },
    },
    {
      level: 'offer',
      name: 'Оффер Озон',
      x: 0,
      y: 0,
      id: 'o2',
      baseParams: {
        offerId: '1147',
        messageID: 'gfhto-966gh-628hg-679kj',
      },
      ossParams: {
        score: 1,
        channelCode: 'SMS',
        offerDesc: 'Предложение для клиентов использующих Озон',
        templateId: 1745,
        OfferPriority: 20,
        calcParams: {
          firstName: 'Data.Person.firstName',
          contactDttm: 'java.time.LocalDateTime.now().toEpochSecond(java.time.ZoneOffset.UTC)',
        },
      },
    },
    {
      level: 'offer',
      name: 'Оффер Старт',
      x: 0,
      y: 0,
      id: 'o3',
      baseParams: {
        offerId: '1158',
        messageID: 'gfhto-116gh-628hg-679kj',
      },
      ossParams: {
        score: 1,
        channelCode: 'SMS',
        offerDesc: 'Предложение Старт для клиентов',
        templateId: 1788,
        OfferPriority: 30,
        calcParams: {
          firstName: 'Data.Person.firstName',
          contactDttm: 'java.time.LocalDateTime.now().toEpochSecond(java.time.ZoneOffset.UTC)',
        },
      },
    },
  ],
}

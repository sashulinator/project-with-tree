export default {
  id: 'v2mockId1',
  rev: '14-8ff1ce515a6857477c57e88d7ff41e91',
  decisionTree: [
    {
      xy: [0, -84],
      level: 'main',
      children: [
        {
          id: 'a1',
          index: 0,
        },
      ],
      name: 'ВХОД',
      id: 'm1',
    },
    {
      xy: [500, -103],
      level: 'arbitration',
      children: [
        {
          id: 'cg1',
          index: 0,
        },
      ],
      maxOffers: 1,
      name: 'Арбитраж 1',
      sortDesc: 'desc',
      id: 'a1',
      arbFormula: 'communications.baseParams.OfferPriority',
    },
    {
      xy: [1000, -103],
      level: 'controlGroup',
      children: [
        {
          id: 'dp1',
          index: 0,
        },
      ],
      name: 'Выделение КГ',
      percentCg: 5,
      id: 'cg1',
      partitionType: 'syrveys_start_1',
    },
    {
      mode: 'any',
      xy: [1500, -103],
      level: 'decisionPoint',
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
          index: 0,
        },
      ],
      name: 'Базовые условия',
      index: 2,
      id: 'dp1',
    },
    {
      mode: 'any',
      xy: [2000, -257],
      level: 'decisionPoint',
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
          index: 0,
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
          index: 1,
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
          index: 2,
        },
      ],
      name: 'Разделение',
      id: 'dp2',
    },
    {
      mode: 'any',
      xy: [2000, 17],
      level: 'decisionPoint',
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
          index: 0,
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
          index: 1,
        },
      ],
      name: 'Прайм',
      id: 'dp3',
    },
    {
      mode: 'any',
      xy: [3000, -120],
      level: 'decisionPoint',
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
          index: 0,
        },
      ],
      name: 'КП Искл',
      id: 'dp4',
    },
    {
      baseParams: {
        offerId: '1101',
        messageID: 'gfhto-245gh-698hg-679kj',
      },
      xy: [3500, 104],
      level: 'offer',
      children: [],
      name: 'Оффер +',
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
      id: 'o1',
    },
    {
      baseParams: {
        offerId: '1147',
        messageID: 'gfhto-966gh-628hg-679kj',
      },
      xy: [3500, -103],
      level: 'offer',
      children: [],
      name: 'Оффер Озон',
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
      id: 'o2',
    },
    {
      baseParams: {
        offerId: '1158',
        messageID: 'gfhto-116gh-628hg-679kj',
      },
      xy: [3500, -310],
      level: 'offer',
      children: [],
      name: 'Оффер Старт',
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
      id: 'o3',
    },
  ],
}

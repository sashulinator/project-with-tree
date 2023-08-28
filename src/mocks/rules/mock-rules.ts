const mock = {
  name: 'mockedRules',
  id: 'mock-rules',
  version: '2.0',
  status: 'DRAFT',
  data: [
    {
      id: '63675f1b40e7019ada99149c70141e3b',
      rev: '1-66d796142c7acfc531e9da5c339e38c1',
      name: 'тестовое правило 2',
      keyName: 'testRRRule2',
      value: '(Data.contactPhoneCommunication.test-attribute == 10 or Data.EpaProfile)',
      frontValue:
        '(@[Тестовый атрибут](attribute, 63675f1b40e7019ada99149c700f67be) == 10 or @[EpaProfile](domain, 1))',
      createDttm: '2023-08-24T11:13:46.009726799',
      updateDttm: '2023-08-24T11:13:46.009729859',
      createdBy: null,
      updatedBy: null,
    },
    {
      id: '63675f1b40e7019ada99149c7015b281',
      rev: '1-2bf70b7eaad369fd88842bb106b79ab5',
      name: 'test20',
      keyName: 'testsd20',
      value:
        '((Data.Profile.RgnCd == 65 && Data.Profile.EmplFlg == true or Data.Profile.StLstVipFlg == false) and Data.Profile.TtBlncAmt > 80 not (Data.Profile.CntrCd != РФ xor Data.communicationHistory.contactTypeCd == phone))',
      frontValue:
        '((@[Код региона клиента](attribute, 63675f1b40e7019ada99149c70153af8) == 65 && @[Признак сотрудников Банка ВТБ и организаций входящих в группу ВТБ](attribute, 63675f1b40e7019ada99149c70154e10) == true or @[Признак Стоп-лист Прайм](attribute, 63675f1b40e7019ada99149c701572ee) == false) and @[Остатки собственных средств на всех счетах, руб.](attribute, 63675f1b40e7019ada99149c70157dcb) > 80 not (@[Гражданство](attribute, 63675f1b40e7019ada99149c7015965a) != РФ xor @[Тип коммуникации](attribute, 63675f1b40e7019ada99149c70144bac) == phone))',
      createDttm: '2023-08-24T19:03:25.112051591',
      updateDttm: '2023-08-24T19:03:25.112059391',
      createdBy: null,
      updatedBy: null,
    },
  ],
}

export default mock

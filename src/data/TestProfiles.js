export const testProfiles = [
  {
    id: 1,
    code: 1001,
    displayName: "001 - Test abc",
    specimenType: "adeptonic",
    hasAdditionalInfo: true,
    additionalInformation: [
      {
        id: 1,
        displayName: "Height",
        name: "height",
        height: 0,
        type: "number",
        isRequired: true,
      },
      {
        id: 2,
        displayName: "Weight",
        name: "weight",
        weight: 0,
        type: "number",
        isRequired: true,
      },
    ],
  },
  {
    id: 2,
    code: 1002,
    displayName: "002 - Test abc",
    specimenType: "fsh",
    hasAdditionalInfo: true,
    additionalInformation: [
      {
        id: 1,
        displayName: "Menstrual Period Date",
        name: "menstrualPeriodDate",
        menstrualPeriodDate: "",
        type: "date",
        isRequired: true,
      },
      {
        id: 2,
        displayName: "Menstrual Period Time",
        name: "mestrualPeriodTime",
        mestrualPeriodTime: "",
        type: "time",
        isRequired: true,
      },
    ],
  },
  {
    id: 3,
    code: 1003,
    displayName: "003 - Test abc",
    specimenType: "test",
    hasAdditionalInfo: false,
  },
  {
    id: 4,
    code: 1004,
    displayName: "004 - Test abc",
    specimenType: "test",
    hasAdditionalInfo: false,
  },
];

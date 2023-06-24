export const PackageData = [
  {
    id: 555,
    type: "Package",
    name: "First Package",
    child: [
      {
        id: 888,
        type: "Test",
        name: "First Test",
        testDetails: {
          specimen: "Serum",
          volumeRequirement: "2.0mL",
        },
        child: [],
      },
      {
        id: 999,
        type: "Profile",
        name: "First Profile",
        child: [
          {
            id: 141,
            type: "Test",
            name: "Second Test",
            testDetails: {
              specimen: "Whole blood",
              volumeRequirement: "1mL",
            },
          },
        ],
      },
    ],
  },
  {
    id: 551,
    type: "Test",
    name: "Third Test",
    testDetails: {
      specimen: "Slide",
      volumeRequirement: "3mL",
    },
    child: [],
  },
  {
    id: 557,
    type: "Test",
    name: "Fourth Test",
    testDetails: {
      specimen: "Serum",
      volumeRequirement: "10mL",
    },
    child: [],
  },
  {
    id: 989,
    type: "Test",
    name: "Fifth Test",
    testDetails: {
      specimen: "Serum",
      volumeRequirement: "50mL",
    },
    child: [],
  },
];

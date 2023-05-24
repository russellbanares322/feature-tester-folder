export const Order = [
  {
    id: 1,
    code: "xx1",
    orderType: "Package",
    specimen: "xxy1",
    child: [
      {
        id: 111,
        code: "ccc1",
        orderType: "Test",
        specimen: "ccx1",
      },
      {
        id: 112,
        code: "ccc2",
        orderType: "Profile",
        specimen: "ccx2",
        child: [
          {
            id: 444,
            code: "ccc3",
            orderType: "Test",
            specimen: "ccx3",
          },
        ],
      },
    ],
  },
  { id: 2, code: "xx2", orderType: "Test", specimen: "xxy2" },
  {
    id: 3,
    code: "xx3",
    orderType: "Profile",
    specimen: "xxy3",
    child: [
      {
        id: 113,
        code: "lll1",
        orderType: "Test",
        specimen: "llx3",
      },
      {
        id: 114,
        code: "lll2",
        orderType: "Test",
        specimen: "llx4",
      },
    ],
  },
];

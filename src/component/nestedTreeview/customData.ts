export type ItemCheckbox = {
  id: number;
  label: string;
  checked: boolean;
  children: ItemCheckbox[];
};

export const dummyData: ItemCheckbox[] = [
  {
    id: 1,
    label: "React",
    checked: false,
    children: [
      {
        id: 2.1,
        label: "MUI",
        checked: false,
        children: [],
      },
      {
        id: 2.2,
        label: "Tailwind.js",
        checked: false,
        children: [],
      },
      {
        id: 2.3,
        label: "CSS.js",
        checked: false,
        children: [
          { id: 3.2, label: "SCSS", checked: false, children: [] },
          { id: 3.3, label: "CSSOM", checked: false, children: [
             {
                id: 5.1,
                label: "DOMCSSOM",
                checked: false,
                children: [
                    { id: 415.1, label: "LIGHTHOUSE", checked: false, children: [] },
                    { id: 415.2, label: "DEBUGGER", checked: false, children: [
                        {
                          id: 6.2,
                          label: "POSTMAN",
                          checked: false,
                          children: [],
                        },
                        {
                          id: 6.3,
                          label: "MIXPANEL",
                          checked: false,
                          children: [],
                        },
                    ] },
                ],
              },
              {
                id: 5.2,
                label: "INSPECT",
                checked: false,
                children: [],
              },
              {
                id: 5.3,
                label: "DEVTOOL",
                checked: false,
                children: [],
              },
          ] },
        ],
      },
    ],
  },
  { id: 2, label: "Vue", checked: false, children: [] },
  { id: 3, label: "Angular", checked: false, children: [] },
  {
    id: 4,
    label: "Svelte",
    checked: false,
    children: [
      {
        id: 4.1,
        label: "Three.js",
        checked: false,
        children: [
            { id: 41.1, label: "ThreeView", checked: false, children: [] },
            { id: 41.2, label: "FourView", checked: false, children: [] },
        ],
      },
      {
        id: 4.2,
        label: "Chart.js",
        checked: false,
        children: [],
      },
      {
        id: 4.3,
        label: "D3.js",
        checked: false,
        children: [],
      },
    ],
  },
];

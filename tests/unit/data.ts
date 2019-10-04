export default class Data {
  data = [
    {
      category: "Sweet",
      name: "Pie",
      calories: "300",
      price: "1$",
      Quantity: "200000",
      Number: "123123123",
      Code: "ASD1231231",
      Zip: "12312",
      Phone: "Number"
    },
    {
      category: "Sweet",
      name: "Donut",
      calories: "300",
      price: "0.5$"
    },
    {
      category: "Meat",
      name: "Steak",
      calories: "300",
      price: "1$"
    }
  ];

  columns = ["Name", "Calories", "Price", "Quantity", "Number", "Zip", "Phone"];

  shortArray = [
    {
      category: "Sweet",
      name: "Pie",
      calories: "300"
    },
    {
      category: "Sweet",
      name: "Donut",
      calories: "300"
    },
    {
      category: "Meat",
      name: "Steak",
      calories: "300"
    }
  ];

  groupedMock = {
      Sweet: [
        {
          category: "Sweet",
          name: "Pie",
          calories: "300"
        },
        {
          category: "Sweet",
          name: "Donut",
          calories: "300"
        }
      ],
      Meat: [
        {
          category: "Meat",
          name: "Steak",
          calories: "300"
        }
      ]
    }
}

import React, { useState } from "react";

function StockTradingForm() {
  const [persons, setpersons] = useState([
    {
      id: 1,
      currentAmount: 10000,
      buyStock: { name: "", count: 0 },
      sellStock: { name: "", count: 0 },
    },
    {
      id: 2,
      currentAmount: 10000,
      buyStock: { name: "", count: 0 },
      sellStock: { name: "", count: 0 },
    },
    {
      id: 3,
      currentAmount: 10000,
      buyStock: { name: "", count: 0 },
      sellStock: { name: "", count: 0 },
    },
    {
      id: 4,
      currentAmount: 10000,
      buyStock: { name: "", count: 0 },
      sellStock: { name: "", count: 0 },
    },
    {
      id: 5,
      currentAmount: 10000,
      buyStock: { name: "", count: 0 },
      sellStock: { name: "", count: 0 },
    },
  ]);

  const [stockInfo, setStockInfo] = useState([
    { id: 1, name: "A", price: 100 },
    { id: 2, name: "B", price: 200 },
    { id: 3, name: "C", price: 300 },
    { id: 4, name: "D", price: 400 },
  ]);

  const handleChange = (e, id, type) => {
    const { value } = e.target;
    setpersons((prevState) =>
      prevState.map((person) =>
        person.id === id ? { ...person, [type]: value } : person
      )
    );
  };

  const handleBuySellChange = (e, id, type, field) => {
    const { value } = e.target;

    setpersons((prevState) =>
      prevState.map((person) =>
        person.id === id
          ? { ...person, [type]: { ...person[type], [field]: value } }
          : person
      )
    );
  };

  const handleBuySellSubmit = (e, id, type) => {
    e.preventDefault();
    const person = persons.find((person) => person.id === id);
    const info = stockInfo.find((info) => info.name === person.buyStock.name);
    const price = info.price;
    const count = person.buyStock.count;
    const total = price * count;

    if (type === "buyStock") {
      if (person.currentAmount >= total) {
        setpersons((prevState) =>
          prevState.map((person) =>
            person.id === id
              ? { ...person, ["currentAmount"]: person.currentAmount - total }
              : person
          )
        );
      } else {
        alert("You do not have enough funds to buy this stock.");
      }
    } else if (type === "sellStock") {
      setpersons((prevState) =>
        prevState.map((person) =>
          person.id === id
            ? { ...person, ["currentAmount"]: person.currentAmount + total }
            : person
        )
      );
    }
  };

  const handleStockInfoChange = (e, id, field) => {
    const { value } = e.target;
    setStockInfo((prevState) =>
      prevState.map((stock) =>
        stock.id === id ? { ...stock, [field]: value } : stock
      )
    );
  };

  const stockNames = ["A", "B", "C", "D"];

  return (
    <div>
      <h1 className="flex flex-col items-center justify-between text-3xl">
        PORTFOLIO VENTURES
      </h1>
      <div className="mr-20 container m-auto grid grid-cols-5 ">
        {persons.map((person, index) => (
          <div key={person.id} className="bg-gray-200 rounded p-4 mb-4">
            <h4 className="text-lg font-semibold">PERSON {person.id}</h4>
            <div className="mb-2">
              <label className="block">
                Current Amount:
                <input
                  type="text"
                  name="currentAmount"
                  value={person.currentAmount}
                  onChange={(e) => handleChange(e, person.id, "currentAmount")}
                  className="form-input mt-1 block w-full"
                />
              </label>
            </div>
            <div className="mb-2">
              <label className="block">
                Buy Stock Name:
                <select
                  name="buyStockName"
                  value={person.buyStock.name}
                  onChange={(e) =>
                    handleBuySellChange(e, person.id, "buyStock", "name")
                  }
                  className="form-select mt-1 block w-full"
                >
                  <option value="">Select Stock</option>
                  {stockNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mt-2">
                Count:
                <input
                  type="number"
                  name="buyStockCount"
                  value={person.buyStock.count}
                  onChange={(e) =>
                    handleBuySellChange(e, person.id, "buyStock", "count")
                  }
                  className="form-input mt-1 block w-full"
                />
              </label>
            </div>
            <button
              onClick={(e) => handleBuySellSubmit(e, person.id, "buyStock")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
            >
              BUY STOCK
            </button>
            <div className="mt-2">
              <label className="block">
                Sell Stock Name:
                <select
                  name="sellStockName"
                  value={person.sellStock.name}
                  onChange={(e) =>
                    handleBuySellChange(e, person.id, "sellStock", "name")
                  }
                  className="form-select mt-1 block w-full"
                >
                  <option value="">Select Stock</option>
                  {stockNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mt-2">
                Count:
                <input
                  type="number"
                  name="sellStockCount"
                  value={person.sellStock.count}
                  onChange={(e) =>
                    handleBuySellChange(e, person.id, "sellStock", "count")
                  }
                  className="form-input mt-1 block w-full"
                />
              </label>
              <button
                onClick={(e) => handleBuySellSubmit(e, person.id, "sellStock")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
              >
                SELL STOCK
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mr-20 container m-auto grid grid-cols-4 ">
        {stockInfo.map((info, index) => (
          <div key={info.id} className="bg-gray-200 rounded p-4 mb-4">
            <h4 className="text-lg font-semibold">Stock: {info.name}</h4>
            <div className="mb-2">
              <label className="block">
                Stock Price:
                <input
                  type="number"
                  name="stockPrice"
                  value={info.price}
                  onChange={(e) => handleStockInfoChange(e, info.id, "price")}
                  className="form-input mt-1 block w-full"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StockTradingForm;

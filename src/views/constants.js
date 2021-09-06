const getDataSource = () => {
  const list = [];
  for (let i = 0; i < 100; i++) {
    // const value = Math.floor(Math.random() * 10);
    list.push({
      key: i.toString(),
      input: Math.floor(Math.random() * 11),
      select: Math.floor(Math.random() * 11),
      multipleSelect: Math.floor(Math.random() * 11),
      datePicker: `2021-8-${Math.floor(Math.random() * (11 - 1) + 1)}`,
      radio: Math.floor(Math.random() * 11),
      checkbox: Math.floor(Math.random() * 11),
    });
  }
  return list;
};

//表格数据
export const dataSource = getDataSource();

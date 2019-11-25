  // 查找数据
  function findData(updateData,data) {
    fetch("http://127.0.0.1:1337/search/?api=2",
    {method: 'POST',
      body:JSON.stringify(data),}
    ).then(function (response) {
      console.log(response);
      return response.json();

    }).then(
      function (json) {
        updateData(json);
    }
    ).catch(function (err) {
      console.log('parsing failed', err);

    })
  }
// 插入数据
  function insertData(data) {
    fetch("http://127.0.0.1:1337/add/?api=1", {
      method: 'POST',
      body:JSON.stringify(data),
    }).then(function (response) {
      console.log(response);
      return response.json();

    }).then(function (json) {
      console.log('parsed json', json);

    }).catch(function (ex) {
      console.log('parsing failed', ex);
    })
  }
// 更新数据
  function updateData(data) {
    fetch("http://127.0.0.1:1337/update/?api=3", {
      method: 'POST',
      body:JSON.stringify(data),
    }).then(function (response) {
      console.log(response);
      return response.json();

    }).then(function (json) {
      console.log('parsed json', json);

    }).catch(function (ex) {
      console.log('parsing failed', ex);
    })
  }
export {findData,insertData,updateData}
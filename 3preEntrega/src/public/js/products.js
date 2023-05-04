const addToCart = async (cid, pid) => {
    await fetch(
      `http://localhost:8080/api/carts/${cid}/products/${pid}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
};
const titleHandler = () => {
  const setTitle = (title) => {
    document.title = `${title} - Cradia Wiki`
  }

  return {
    setTitle,
  }
}

export default titleHandler

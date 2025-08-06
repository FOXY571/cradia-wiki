const soundCloudPlayer = () => {
  const soundCloudPlayer = {
    type: 'lang',
    filter: function (text) {
      const regex = /#sc\(([^()]+?)\)/g
      return text.replace(regex, (_match, p1) => {
        return `<div height="100%" style="display: flex; align-items: center;"><iframe width="100%" height="20" src="https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/${p1}&inverse=false&auto_play=false&show_user=false" frameborder="0" allow="autoplay" title="soundcloud" referrerpolicy="no-referrer" style="filter: invert(1) hue-rotate(225deg);"></iframe></div>`
      })
    },
  }

  return [soundCloudPlayer]
}

export default soundCloudPlayer

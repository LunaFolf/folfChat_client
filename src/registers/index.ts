['socket', 'interactions'].forEach((register: string) => {
  require(`./${register}`)
})
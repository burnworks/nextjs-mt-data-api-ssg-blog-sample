const ENDPOINT = process.env.MT_ENDPOINT_URL

const fetchAPI = async (path) => {
    const res = await fetch(`${ENDPOINT}${path}`).catch((err) => { console.error(err) })
    const json = await res.json()
    return json
}

const fetchAllPosts = () => {
    const params = [['limit', '5'], ['status', 'Publish']]
    const param = new URLSearchParams(params).toString()

    return fetchAPI(`?${param}`)
}

export const getAllPosts = async () => {
    const data = await fetchAllPosts()
    return data
}
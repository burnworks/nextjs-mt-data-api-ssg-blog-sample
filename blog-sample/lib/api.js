const ENDPOINT = process.env.MT_ENDPOINT_URL

const fetchAPI = async (path) => {
    const res = await fetch(`${ENDPOINT}${path}`)

    if (!res.ok) {
        console.error(await res.text())
        throw new Error('Failed to fetch API')
    }

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

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
import axios, { AxiosResponse } from "axios";

export type BlogService = {
    loadOverview: (filter?: { topicName: string, topicId: string}) => Promise<AxiosResponse<any>>;
    load: (topicId: string) => Promise<AxiosResponse<any>>;
    create: (blog: { topic: string, content: string}) => Promise<AxiosResponse<any>>;
    change: (blog: { topic?: string, content?: string}) => Promise<AxiosResponse<any>>;
    delete: (topicId: string) => Promise<AxiosResponse<any>>;
}

export const blogService = new (class BlogServiceLocal implements BlogService {
    private url = "http://localhost:3001"

    loadOverview(filter?: { topicName: string, topicId: string}) {
        const _url = `${this.url}/api/getEntries/${filter?.topicName || filter?.topicId}`;
        return axios.get(_url);
    }

    load(topicId: string) {
        const _url = `${this.url}/api/getEntry/${topicId}`;
        return axios.get(_url);
    }

    create(blog: {topic: string, content: string}) {
        const _url = `${this.url}/api/createEntry/${blog}`;
        return axios.post(_url);
    }

    change(blog: {topic?: string, content?: string}) {
        const _url = `${this.url}/api/changeEntry/${blog}`;
        return axios.post(_url);
    }

    delete(topicId: string) {
        const _url = `${this.url}/api/deleteEntry/${topicId}`;
        return axios.delete(_url);
    }

})();
/**
 * MockFetch.ts - Mock HTTP 请求
 */

export interface MockResponse<T> {
    data: T;
    status: number;
    ok: boolean;
}

export class MockFetch {
    /**
     * 模拟 GET 请求
     */
    public static async get<T>(_url: string, mockData: T, delay: number = 100): Promise<MockResponse<T>> {
        await new Promise(resolve => setTimeout(resolve, delay));

        return {
            data: mockData,
            status: 200,
            ok: true
        };
    }

    /**
     * 模拟 POST 请求
     */
    public static async post<T, R>(_url: string, _body: T, mockResponse: R, delay: number = 100): Promise<MockResponse<R>> {
        await new Promise(resolve => setTimeout(resolve, delay));

        return {
            data: mockResponse,
            status: 201,
            ok: true
        };
    }
}

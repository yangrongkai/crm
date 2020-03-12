'use strict'


export interface IServer{
    flag: string;
    getDescription(): string;
}

export  class CrmServer implements IServer{
    flag = "crm";

    getDescription(): string{
        return "crm 服务接口调用"
    }
}

export  class TestServer implements IServer{
    flag = "test";

    getDescription(): string{
        return "user 服务接口调用"
    }
}


export const servers = [
    new CrmServer(),
    new TestServer(),
]

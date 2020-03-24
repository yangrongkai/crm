import * as React from 'react';
import { Layout } from 'antd';

import './index.less';
import * as globalConfig from '&/config.js';

import { wrapper } from 'containers/components/base';


export interface FooterProps {
}

class FooterComponent extends React.PureComponent<FooterProps> {

    static defaultProps: Partial<FooterProps> = {
    };

    render() {
        const text: string = globalConfig.footer || 'footer被弄丢啦!';
    
        // backtop如果不设置target会有问题
        // footer的字可以有html标签, 有一定XSS的风险, 不过问题不大
        return (
            <Layout.Footer dangerouslySetInnerHTML={{ __html: text }} />
        );
    }

}


export const Footer = wrapper({component: FooterComponent});

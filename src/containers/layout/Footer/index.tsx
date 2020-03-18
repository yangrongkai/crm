import * as React from 'react';

import './index.less';
import * as globalConfig from '&/config.js';


export interface FooterProps {
}

export class Footer extends React.PureComponent<FooterProps> {

    static defaultProps: Partial<FooterProps> = {
    };

    render() {
        const text: string = globalConfig.footer || 'footer被弄丢啦!';
    
        // backtop如果不设置target会有问题
        // footer的字可以有html标签, 有一定XSS的风险, 不过问题不大
        return (
            <div>
                <div className="ant-layout-footer" dangerouslySetInnerHTML={{ __html: text }}/>
            </div>
        );
    }

}

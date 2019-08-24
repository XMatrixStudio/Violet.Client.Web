import React, { Component } from 'react'
import { ChartCard, MiniArea, Pie } from 'ant-design-pro/lib/Charts'
import NumberInfo from 'ant-design-pro/lib/NumberInfo'
import numeral from 'numeral'
import moment from 'moment'

import './AppChart.less'

class AppChart extends Component {
  render() {
    const visitData = []
    const beginDay = new Date().getTime()
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
          'YYYY-MM-DD'
        ),
        y: Math.floor(Math.random() * 100) + 10
      })
    }
    return (
      <div className='app-chart'>
        <div className='base-card-box'>
          <ChartCard
            title='用户访问数量'
            total={numeral(8846).format('0,0')}
            contentHeight={180}
          >
            <NumberInfo
              subTitle={<span>本周访问</span>}
              total={numeral(1321).format('0,0')}
              status='up'
              subTotal={17.1}
            />
            <MiniArea line={true} height={85} data={visitData} />
          </ChartCard>
        </div>
        <div className='base-card-box'>
          <Pie
            hasLegend={true}
            title='授权状况'
            subTitle='成功率'
            total='92%'
            data={[
              { x: '成功', y: 92 },
              { x: '取消授权', y: 2 },
              { x: '授权失败', y: 6 }
            ]}
            height={294}
          />
        </div>
      </div>
    )
  }
}

export default AppChart

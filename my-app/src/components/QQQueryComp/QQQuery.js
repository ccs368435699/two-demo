import React, { useState, useCallback } from 'react'
import PropTypes from "prop-types"
import { axios_instance } from '../../http'
import LoadingComp from './LoadingComp'

// qq信息初始值
const initInfo = {
    "qq": "774740085",
    "name": "ゆ、 音色 Cutey。",
    "qlogo": 'http://doc.weex.io/logo@2x.svg',//"http:\/\/qlogo2.store.qq.com\/qzone\/774740085\/774740085\/100",
    "lvzuan": {
        "code": 0,
        "subcode": 0,
        "level": 7,
        "vip": 1,
        "score": 52402,
        "place": 0,
        "payway": 0,
        "isyear": 1,
        "vendor": 18
    }
}
// qq用户信息展示组件
const QQInfoComp = ({ nickName, qq, iconUri }) => {
    return (
        <div role="qqinfo" style={infoStyle}>
            <div style={imgStyle}>
                <img
                    alt="img"
                    src={iconUri}
                    style={iconStyle}
                />
            </div>
            <div>
                <div style={nameStyle}>
                    <span className='nickname'>{nickName}</span>
                </div>
                <div style={NumStyle}>
                    <span className='qq'>{qq}</span>
                </div>
            </div>
        </div>
    )
}
QQInfoComp.propTypes = {
    nickName: PropTypes.string,
    qq: PropTypes.string,
    iconUri: PropTypes.string
}
// 请求发生错误组件
const ErrorComp = () => {
    return (
        <div
            style={{ marginTop: "10px", color: "red" }}
        >
            happening some error, not find your QQ, sorry!
        </div>
    )
}


const QQQueryComp = () => {
    const [hasError, setHasError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [qqInfo, setQqInfo] = useState(initInfo)
    // 请求qq号信息
    const getQQInfo = useCallback((event) => {
        event = event || window.event
        let iptNum = parseInt(event.target.value.trim())
        let stringIptNum = String(iptNum)
        if (!iptNum) {
            window && window.alert('请输入正确的QQ号')
            hasError && setHasError(false)
            setLoading(false)
            return
        }
        setLoading(true)
        axios_instance.get(`/qq.info?qq=${stringIptNum}`)
            .then((res) => {
                if (res.code === 1) {
                    setQqInfo(() => {
                        return { ...qqInfo, ...res }
                    })
                    setLoading(false)
                } else {
                    setHasError(true)
                }
            }).catch((err) => {
                !!err && setHasError(true)
                setLoading(false)
                // 可以根据错误类型做相应的措施。
                // if(err.response){
                //     switch(err.response.status){
                //         case  201702:
                //             break
                //         default:
                //             break
                //     }
                // }
            })

    }, [qqInfo,hasError])

    return (
        <div style={qqStyle}>
            <h1>QQ号查询</h1>
            <div>
                <span style={qqTitle}>QQ</span>
                <input
                    role="inputqq"
                    id="qq"
                    type="text"
                    style={iptStyle}
                    onChange={(e) => !e.target.value.length && setHasError(false)}
                    onBlur={(e) => getQQInfo(e)}
                />
            </div>
            <div style={{ position: "relative" }}>
                {
                    loading
                        ? (<LoadingComp />)
                        : null
                }
                {
                    hasError
                        ? (<ErrorComp />)
                        : (<QQInfoComp
                            nickName={qqInfo.name}
                            qq={qqInfo.qq}
                            iconUri={qqInfo.qlogo}
                        />)
                }
            </div>
        </div>
    )
}


// 样式。 
const qqStyle = {
    margin: "0 auto",
    backgroundColor: "#FFF",
    width: "300px",
    height: "300px",
    fontSize: "inherit"
}
const qqTitle = {
    marginRight: "10px",
    fontWeight: "600"
}
const iptStyle = {
    color: "#666",
    fontSize: "16px",
    fontWeight: "bolder",
    border: "0px",
    height: "16px",
    width: "100px",
    outline: "none",
    borderBottom: "2px solid #999"
}
const infoStyle = {
    backgroundColor: "pink",
    margin: "0 auto",
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "130px",
    height: "50px",
    border: "1px solid #666",
    borderRadius: "10px"
}
const nameStyle = {
    width: "85px",
    fontWeight: "bolder",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
}
const imgStyle = {
    backgroundColor: 'red',
    width: "36px",
    height: "36px",
    borderRadius: "20px",
    overflow: "hidden"
}
const iconStyle = {
    width: "100%",
    height: "100%"
}
const NumStyle = {
    color: "#aaa",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
}

export { QQInfoComp }
export default QQQueryComp

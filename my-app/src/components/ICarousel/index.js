/**
 * @name ICarousel * 
 * @desc 轮播
 * @version 2022-4-12
 */
import React, { Component } from "react";
import PropTypes from "prop-types"
import Slider from './views/Slider'
import Fade from "./views/Fade";
import Navigation from "./views/Navigation"
import Pagination from "./views/Pagination";
import './ICarousel.css'

import img1 from "./images/img001.jpg"
import img2 from "./images/img002.jpg"
import img3 from "./images/img003.jpg"


const TRANSITION_DURATION = 1000
class ICarousel extends Component {
    state = {
        curr: 0,
        direction: "forward", // ['forward','backward'] 通过方向来判断需要用哪个过渡动画
        locked: false //动画过渡锁,防止切换频繁
    }
    componentDidMount() {
        this.initAutoPlay()
    }
    componentWillUnmount() {
        // 禁止卸载组件时,触发setState
        this.setState = (state, cb) => null
        // 清除自动播放计时器
        clearTimeout(this.playTimer)
    }

    openLock = () => {
        const t = setTimeout(() => {
            clearTimeout(t)
            this.setState({ locked: false })
        }, TRANSITION_DURATION)
    }
    initAutoPlay = () => {
        if (!this.props.autoPlay) {
            return
        }

        this.playTimer = setInterval(() => {
            this.onNext()
        }, this.props.interval)
    }

    onChange = index => {
        if (this.state.locked) {
            return
        }
        this.setState(prevState => ({ curr: index, direction: index > prevState.curr ? "forward" : "backward", locked: false }), this.openLock)
    }
    onPrev = () => {
        if (this.state.locked) {
            return
        }
        this.setState(prevState => {
            const index = backCycle(prevState.curr - 1, this.props.images.length)
            return { curr: index, direction: "backward", locked: false }
        })
    }
    onNext = () => {
        if (this.state.locked) {
            return
        }
        this.setState(prevState => {
            const index = backCycle(prevState.curr + 1, this.props.images.length)
            return { curr: index, direction: "forward", locked: false }
        }, this.openLock)
    }


    get renderContent() {
        const { images, titles, descriptions, effect } = this.props
        const { curr, direction } = this.state

        switch (effect) {
            case "slide":
                return <Slider
                    images={images}
                    titles={titles}
                    descriptions = {descriptions }
                    curr={curr}
                    direction={direction}
                />
            default:
                return <Fade images={images} curr={curr} />
        }
    }
    get renderPagenation() {
        const { images, pagination } = this.props
        const { curr } = this.state
        if (!pagination) return
        return (<Pagination images={images} curr={curr} onChange={this.onChange} />)

    }

    render() {
        const { width, height, navgation } = this.props
        return (
            <div className="react-carousel_container" style={{width, height}}>
                {this.renderContent}
                {navgation && <Navigation onPrev={this.onPrev} onNext={this.onNext} />}
                {this.renderPagenation}
            </div>
        )
    }
}

ICarousel.propTypes = {
    width: PropTypes.string, //宽度
    height: PropTypes.string, //高度
    effect: PropTypes.oneOf(["fade", "slide", "scale"]), //切换方式
    images: PropTypes.arrayOf(PropTypes.string).isRequired, //图片路径数组
    titles: PropTypes.arrayOf(PropTypes.string).isRequired,//标题数组
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,//描述数组
    autoPlay: PropTypes.bool, //是否自动播放
    interval: PropTypes.number, //自动播放时,播放间隔(毫秒)
    navgation: PropTypes.oneOfType([PropTypes.bool]), //是否显示"前进","后退"按钮
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]) //是否显示底部"页码"
}

ICarousel.defaultProps = {
    width: "100%",
    height: "460px",
    effect: "fade",
    images: [img1, img2, img3],
    titles: ['标题1', '标题2', '标题3'],
    descriptions: ['aaa', 'bbb', 'ccc'],
    autoPlay: true,
    interval: 3000,
    navgation: true,
    pagination: true
}


function backCycle(num, cycle) {
    let index = num % cycle
    if (index < 0) {
        index += cycle
    }
    return index
}



export default ICarousel
export { TRANSITION_DURATION }
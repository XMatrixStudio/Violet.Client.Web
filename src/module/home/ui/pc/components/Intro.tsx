import React from 'react'

import IconSecurity from 'assets/image/home/security.png'
import IconNew from 'assets/image/home/new.png'
import IconThunder from 'assets/image/home/thunder.png'
import IconGithub from 'assets/image/home/github.svg'

import ScrollAnimation from 'react-animate-on-scroll'
import { IStyle, mergeStyleSets } from '@fluentui/react'
import { color, style } from 'style'

const Intro = () => {

  const styles = mergeStyleSets({
    topLayout: {
      textAlign: 'left',
      height: '100vh',
      backgroundImage: 'linear-gradient(to bottom, rgb(231, 248, 250), #ffffff)',
      transition: style.transition
    } as IStyle,
    topTitle: {
      color: color.textPrimaryDark,
      fontSize: style.fontLargest,
      position: 'absolute',
      top: '30vh',
      left: '6%',
      '& p': {
        margin: '23px 10px'
      } as IStyle
    } as IStyle,
    detailLayout: {
      height: '60vh',
      padding: '0 5%',
      display: 'flex'
    } as IStyle,
    detailItem: {
      flex: 1,
      verticalAlign: 'top',
      display: 'inline-block',
      textAlign: 'left',
      margin: '10vh 3%'
    } as IStyle,
    detailIcon: {
      margin: '10px 0',
      userSelect: 'none',
      '& img': {
        height: 36,
      } as IStyle
    } as IStyle,
    detailTitle: {
      userSelect: 'none',
      fontWeight: 'bold',
      fontSize: style.fontLarger,
      margin: '20px 0'
    } as IStyle,
    detailText: {
      fontSize: style.fontNormal,
      color: color.textSecondary
    } as IStyle,
    githubLink: {
      margin: 10,
      '& a': {
        margin: 14,
        fontSize: style.fontLarge,
        color: color.textPrimaryLight,
      } as IStyle,
      '& img': {
        height: 24,
        width: 24,
        verticalAlign: 'middle'
      } as IStyle
    } as IStyle
  })


  return (
    <div>
      <div className={styles.topLayout}>
        <ScrollAnimation animateIn='fadeIn' className={styles.topTitle}>
          <p>Violet 中央授权系统</p>
          <p>第三代</p>
          <p>全新形象</p>
          <div className={styles.githubLink}>
            <img src={IconGithub} alt='github' />
            <a href='//github.com/XMatrixStudio/Violet' target='_blank' rel='noopener noreferrer'>
              Github
            </a>
          </div>
        </ScrollAnimation>
      </div>

      <div className={styles.detailLayout}>
        <ScrollAnimation className={styles.detailItem} animateIn='fadeIn'>
          <div className={styles.detailIcon}>
            <img src={IconSecurity} alt='security' />
          </div>
          <p className={styles.detailTitle}>安全</p>
          <p className={styles.detailText}>
            基于OAuth2.0，多重防御措施，全程加密通讯，保护你的账号安全
          </p>
        </ScrollAnimation>
        <ScrollAnimation className={styles.detailItem} animateIn='fadeIn'>
          <div className={styles.detailIcon}>
            <img src={IconThunder} alt='thunder' />
          </div>
          <p className={styles.detailTitle}>极速</p>
          <p className={styles.detailText}>极速授权，一键访问你的所有应用</p>
        </ScrollAnimation>
        <ScrollAnimation className={styles.detailItem} animateIn='fadeIn'>
          <div className={styles.detailIcon}>
            <img src={IconNew} alt='new' />
          </div>
          <p className={styles.detailTitle}>先进</p>
          <p className={styles.detailText}>
            采用最强的秀秀作为程序员，写出来的BUG绝无代码
          </p>
        </ScrollAnimation>
      </div>
    </div>
  )
}

export default Intro

import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Slider, Upload, Icon, Modal } from 'antd'
import './AvatarSelect.less'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { UploadChangeParam } from 'antd/lib/upload/interface'

interface IAvatarSelect {
  imageURL?: string
  setImage: (file?: File) => void
  title: string
}

@observer
class AvatarSelect extends Component<IAvatarSelect> {
  @observable scaleValue = 1.2
  @observable avatarFile: File | undefined
  @observable imageURL?: string

  @observable showModel: boolean

  editor: AvatarEditor

  constructor(props: IAvatarSelect) {
    super(props)
    this.resetImage()
    this.imageURL = undefined
    this.showModel = false
  }

  setEditorRef = (editor: AvatarEditor) => (this.editor = editor)

  resetImage = () => {
    this.avatarFile = undefined
    this.scaleValue = 1.2
  }

  handleOk = () => {
    const canvas = this.editor.getImageScaledToCanvas().toDataURL()
    fetch(canvas)
      .then(res => res.blob())
      .then(blob => {
        this.imageURL = window.URL.createObjectURL(blob)
      })
    this.props.setImage(this.avatarFile)
    this.showModel = false
  }

  handleCancel = () => {
    if (this.avatarFile === undefined) {
      this.showModel = false
    } else {
      this.resetImage()
    }
  }

  render() {
    return (
      <div className='avatar-select'>
        <div className='view'>
          <img
            className='image-view'
            src={this.imageURL || this.props.imageURL}
            style={{ borderRadius: '100px' }}
            onClick={() => {
              this.avatarFile = undefined
              this.scaleValue = 1.2
              this.showModel = true
            }}
          />
        </div>
        <Modal
          title='选择图片'
          visible={this.showModel}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText={this.avatarFile === undefined ? '取消' : '更换图片'}
          okText='确认'
          okButtonProps={{ disabled: this.avatarFile === undefined }}
        >
          {this.avatarFile === undefined ? (
            <Upload.Dragger
              // tslint:disable-next-line:no-empty
              customRequest={(option: any) => {}}
              showUploadList={false}
              onChange={(info: UploadChangeParam) => {
                this.avatarFile = info.file.originFileObj
              }}
            >
              <p className='ant-upload-drag-icon'>
                <Icon type='plus' />
              </p>
              <p className='ant-upload-text'>{this.props.title}</p>
            </Upload.Dragger>
          ) : (
            <div>
              <AvatarEditor
                className='avatar-editor'
                ref={this.setEditorRef}
                image={this.avatarFile!}
                width={120}
                height={120}
                border={10}
                color={[0, 0, 0, 0.6]} // RGBA
                scale={this.scaleValue}
                borderRadius={100}
              />
              <div className='avatar-control'>
                缩放:
                <Slider
                  defaultValue={this.scaleValue}
                  min={0}
                  max={30}
                  onChange={(v: number) => {
                    this.scaleValue = 1 + v * 0.1
                  }}
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
    )
  }
}

export default AvatarSelect

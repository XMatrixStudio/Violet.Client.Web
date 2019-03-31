import React, { Component } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Slider, Button, Upload, Icon } from 'antd'
import './AvatarSelect.less'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { UploadChangeParam } from 'antd/lib/upload/interface'

interface IAvatarSelect {
  setImage: (file?: File) => void
}

@observer
class AvatarSelect extends Component<IAvatarSelect> {
  @observable scaleValue = 1.2
  @observable avatarFile: File | undefined
  @observable imageURL?: string
  editor: AvatarEditor

  constructor(props: any) {
    super(props)
    this.resetImage()
  }

  setEditorRef = (editor: AvatarEditor) => (this.editor = editor)

  resetImage = () => {
    this.imageURL = undefined
    this.avatarFile = undefined
    this.scaleValue = 1.2
    this.props.setImage(undefined)
  }

  render() {
    return (
      <div className='avatar-select'>
        {this.imageURL !== undefined ? (
          <div>
            <img src={this.imageURL} style={{ borderRadius: '100px' }} />
            <div className='del-div'>
              <Icon
                type='close-circle'
                theme='twoTone'
                twoToneColor='#eb2828'
                onClick={this.resetImage}
              />
            </div>
          </div>
        ) : this.avatarFile === undefined ? (
          <Upload.Dragger
            // tslint:disable-next-line:no-empty
            customRequest={(option: any) => {}}
            showUploadList={false}
            onChange={(info: UploadChangeParam) => {
              this.avatarFile = info.file.originFileObj
              this.props.setImage(this.avatarFile)
            }}
          >
            <p className='ant-upload-drag-icon'>
              <Icon type='plus' />
            </p>
            <p className='ant-upload-text'>点击或拖动选择应用图标</p>
          </Upload.Dragger>
        ) : (
          <div>
            <AvatarEditor
              className='avatar-editor'
              ref={this.setEditorRef}
              image={this.avatarFile!}
              width={150}
              height={150}
              border={10}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={this.scaleValue}
              borderRadius={100}
            />
            <div className='avatar-control'>
              <div>
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
              <Button
                type='primary'
                className='btn-crop'
                onClick={() => {
                  const canvas = this.editor
                    .getImageScaledToCanvas()
                    .toDataURL()
                  fetch(canvas)
                    .then(res => res.blob())
                    .then(blob => {
                      this.imageURL = window.URL.createObjectURL(blob)
                    })
                }}
              >
                确认
              </Button>
              <Button
                type='primary'
                className='btn-crop btn-right'
                onClick={this.resetImage}
              >
                更换图片
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AvatarSelect

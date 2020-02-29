import React,{Component} from 'react';
import Firebase from '../Firebase';
import { loadModels, getFullFaceDescription } from '../api/face';
import { Image,Button } from 'semantic-ui-react';

const INIT_STATE = {
    imageURL: null,
    fullDesc: null
  };

class AddParent extends Component{

    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE,
            image: null,
            name : '',
            tel: '',
            line_id: '',
            stdImage: '',
            urllink: ''
        };
    }

    componentDidMount = () =>{
        Firebase.firestore().collection('student')
        .doc(this.props.match.params.id).get()
        .then(doc =>{
            this.setState({
                stdImage : doc.data().imageURL,
            })
        })
    }
    componentWillMount = async () => {
        await loadModels();
        if(this.state.imageURL != null){
            await this.handleImage(this.state.imageURL);
        }
    }

    handleImage = async (image = this.state.imageURL) => {
        await getFullFaceDescription(image).then(fullDesc => {
            if (!!fullDesc) {
                this.setState({
                    fullDesc,
                    detections: fullDesc.map(fd => fd.detection)
                });
            }
        });
        console.log(this.state.fullDesc[0].descriptor);
    };

    handleFileChange = async event => {
        var file = event.target.files[0];
        this.resetState();
        if(event.target.files[0]){
            const image = file;
            this.setState( () =>({image}));
        }
        await this.setState({
            imageURL: URL.createObjectURL(file),
            loading: true
        });
        this.handleImage();
    };

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleTelChange = (e) => {
        this.setState({
            tel: e.target.value
        });
    }

    handleLineChange = (e) => {
        this.setState({
            line_id: e.target.value
        });
    }

    handleSubmit = () => {
        console.log("debug");
        const {image} = this.state;
        const uploadTask = Firebase.storage().ref('parent/'+image.name).put(image);
        uploadTask.on('state_changed',
        (snapshot) =>{

        },
        (error) => {
            console.log(error);
        },
        () => {
            Firebase.storage().ref('parent').child(image.name).getDownloadURL().then(url =>{
                this.setState({
                    urllink : url.toString()
                })
                var data ={
                    imageURL: this.state.urllink,
                    name: this.state.name,
                    descriptors: Array.from(this.state.fullDesc[0].descriptor),
                    tel: this.state.tel,
                    line_id:this.state.line_id,
                    studentID:this.props.match.params.id
                }
                Firebase.firestore().collection("parent").doc().set(data).then(function() {
                  console.log("Document successfully written!");
                  alert("Add data Successful");
              });
            })
        });

    }


    resetState = () => {
        this.setState({ ...INIT_STATE });
    };
    
    render() {
        const { imageURL, detections } = this.state;
    
        let drawBox = null;
        if (!!detections) {
          drawBox = detections.map((detection, i) => {
            let _H = detection.box.height;
            let _W = detection.box.width;
            let _X = detection.box._x;
            let _Y = detection.box._y;
            return (
              <div key={i}>
                <div
                  style={{
                    position: 'absolute',
                    border: 'solid',
                    borderColor: 'pink',
                    height: _H,
                    width: _W,
                    transform: `translate(${_X}px,${_Y}px)`
                  }}
                />
              </div>
            );
          });
        }
    
        return (
          <div>
              <Image src={this.state.stdImage} size='medium' centered />
            <input
              id="myFileUpload"
              type="file"
              onChange={this.handleFileChange}
              accept=".jpg, .jpeg, .png"
            />
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute' }}>
              <Image src={imageURL} />
              {
                  this.state.fullDesc == null ? <p></p>: 
                  
                  <div>
                  <div className="ui form">
                    <br/>
                    <div className="equal width fields">
                        <div className="field">
                          <label><b>Fullname :</b></label>
                          <div className="ui left icon input">
                              <input type="text" 
                                      placeholder="Fullname"
                                      onChange={this.handleNameChange}
                                      value={this.state.name}/>
                              <i aria-hidden="true" class="users icon"></i>
                          </div>
                        </div>
                        <div className="field">
                          <label><b>Tel :</b></label>
                          <div className="ui left icon input">
                              <input type="text" 
                                      placeholder="xxx-xxx-xxxx"
                                      onChange={this.handleTelChange} />
                              <i aria-hidden="true" class="phone icon"></i>
                          </div>
                        </div>
                       <div className="field">
                        <label><b>Line ID :</b></label>
                            <div className="ui left icon input">
                                <input type="text" 
                                        placeholder="Line ID"
                                        onChange={this.handleLineChange}
                                        value={this.state.line_id}/>
                                <i aria-hidden="true" class="linechat icon"></i>
                            </div>
                        </div>
                      </div>
                      <Button onClick={this.handleSubmit} color='olive'>Add Parent</Button>
                  </div>
                  </div>
                  }
            </div>
            {!!drawBox ? drawBox : null}
          </div>
        </div>
        );
      }
}

export default AddParent;
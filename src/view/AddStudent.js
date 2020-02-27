import React,{Component} from 'react';
import { loadModels, getFullFaceDescription } from '../api/face';
import { Image } from 'semantic-ui-react';
import Firebase from '../Firebase';

const INIT_STATE = {
    imageURL: null,
    fullDesc: null
  };

class AddStudent extends Component{

    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE,
            image: null,
            name : '',
            stdId: '',
            urllink: '',
            email: '',
            address: ''
        };
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
        })
    }

    handlestdIDChange = (e) => {
        this.setState({
            stdId: e.target.value
        })
    }

    handleEmailChange = (e) =>{
      this.setState({
        email: e.target.value
      })
    }

    handleAddressChange = (e) =>{
      this.setState({
        address: e.target.value
      })
    }

    handleUpload = () => {
        console.log("debug");
        const {image} = this.state;
        const uploadTask = Firebase.storage().ref('student/'+image.name).put(image);
        uploadTask.on('state_changed',
        (snapshot) =>{

        },
        (error) => {
            console.log(error);
        },
        () => {
            Firebase.storage().ref('student').child(image.name).getDownloadURL().then(url =>{
                console.log(url);
                console.log(this.state.fullDesc);
                this.setState({
                    urllink : url.toString()
                })
                var data ={
                    imageURL: this.state.urllink,
                    name: this.state.name,
                    stdId: this.state.stdId,
                    descriptors: Array.from(this.state.fullDesc[0].descriptor),
                    email: this.state.email,
                    address: this.state.address
                }
                Firebase.firestore().collection("student").doc().set(data).then(function() {
                  console.log("Document successfully written!");
                  alert("Add data Successful");
                  this.props.history.push('/');
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
                          <label><b>Student ID :</b></label>
                          <div className="ui left icon input">
                              <input type="text" 
                                      placeholder="Student ID"
                                      onChange={this.handlestdIDChange} />
                              <i aria-hidden="true" class="user icon"></i>
                          </div>
                        </div>
                       <div className="field">
                        <label><b>Email :</b></label>
                            <div className="ui left icon input">
                                <input type="text" 
                                        placeholder="Email"
                                        onChange={this.handleEmailChange}
                                        value={this.state.email}/>
                                <i aria-hidden="true" class="mail icon"></i>
                            </div>
                        </div>
                      </div>
                        <label><b>Address :</b></label>
                        <div className="field">
                          <textarea placeholder="Tell us more about you..." 
                                    rows="3" 
                                    onChange={this.handleAddressChange}
                                    value={this.state.address} ></textarea>
                        </div>
                        <button onClick={this.handleUpload} className="btn btn-success">Add to Database</button>
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

export default AddStudent;
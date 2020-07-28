import React, {useState} from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { MyContext } from '../../../context/MyProvider';
import Api from '../../../Api/index';
import './SocialLogin.css';

const SocialLogin = (props) => {

    const { logUserIntoContext } = React.useContext(MyContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [id, setId] = useState('');
    const [picture, setPicture] = useState('');
    const [posted, setPosted] = useState(false);


    const postProfile = (user) => {
                
        console.log(email)
        
        console.log(user)
        Api.socialSignUp(user)
        .then((data) => {
                 console.log(data)
                Api.setSessionToken(data.data.accessToken)
                Api.setPoints({
                                             'spotify_round_one':0,
                                             'spotify_round_two':0,
                                             'instagram_round_one':0,
                                             'instagram_round_two':0,
                                             'youtube_round_one':0,
                                             'youtube_round_two':0,
                                             'total_app_points': 0,
                                              'user': data.data.id
                                         }).then((resp)=>{
                                            console.log(resp)
                                            Api.getPoints(data.data.id)
                                            .then((resp2)=>{
                                                let user = {...data.data, ...resp2['data']};
                                                logUserIntoContext(user);
                                                window.location.reload(true);
                                                console.log('data you pass to the context', user);
                                            })   
                                        }) 
             },(err)=>{

             })
            };



    const responseFacebook =  (response) => {
        console.log(response);
        let user = {
                
            'name' : response.name.toLowerCase(),
            "email": response.email,
            "id": response.id,
            "picture": response.picture.data.url,
            "roles": ["user"]
                    
             
             }

        // setEmail(response.email);
        // setUsername(response.name);
        // setId(response.id);
        // setPicture(response.picture.data.url);
        // postProfile(response)
        postProfile(user)
      }
    
      const responseGoogle =  (response) => {
        console.log(response);  
        console.log((response.profileObj.imageUrl));
        let user = {
                
            'name' : response.profileObj.name.toLowerCase(),
            "email": response.profileObj.email,
            "id": response.profileObj.googleId,
            "picture": response.profileObj.imageUrl,
            "roles": ["user"]
                    
             
             }

        // setEmail(response.profileObj.email);

        // setUsername(response.profileObj.givenName);
        // setId(response.profileObj.googleId);
        // setPicture(response.profileObj.imageUrl);
        postProfile(user)
      }

      const responseGoogleFail = (response) => {

      }

    
    return (
        <MyContext.Consumer>
        {(context) => (
     <div>

           
           <FacebookLogin           
            appId="1001755983615818" //APP ID 
            fields="name,email,picture"
            callback={responseFacebook}
            
            />
            
             {id
            ?
            <button onClick={postProfile}>sign</button>
            :
            <p></p>
        } 
          

            
            <GoogleLogin           
            clientId="278860152347-ojkar9rh5hg8o2drhgrf3gc4taq0o9q3.apps.googleusercontent.com" //CLIENTID 
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogleFail}
        />
      <br></br>
      <br></br>
        
    </div>
          )}
          </MyContext.Consumer>
  );
};

export default SocialLogin;
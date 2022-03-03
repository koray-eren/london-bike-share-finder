import { Container, TextField, Button } from '@mui/material';

function ApiKeyForm(props) {
  const handleClick = () => {
    const keyInput = document.getElementById('apiKeyField').value;
    props.setApiKey(keyInput);
  };

  return(
    <>
      <Container maxWidth="lg">
        <p>Please enter an API key for the <a href='https://api-portal.tfl.gov.uk'>Transport for London API</a></p>
      </Container>
      <Container maxWidth="sm" style={{display: 'flex', justifyContent: 'center'}}>
        <TextField style={{paddingRight: '2%'}} id="apiKeyField" label="API Key" variant="outlined" />
        <Button onClick={handleClick} variant='contained'>Submit</Button>
      </Container>
    </>
  )
  }

export default ApiKeyForm;
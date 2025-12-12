export default function Address1(props){
const {number, street, city, state, zip, country} = props;

return (
    <>
<p>{number}</p>
<p>{street}</p>
<p>{city}</p>
<p>{state} {zip}</p>
<p>{country}</p>
</>
);



}
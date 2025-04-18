import './App.css'
import LabTabs from './components/Tabules';


export const App = () => {


  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  
  return (
    
    <section>
      <LabTabs onSubmit={handleSubmit} /> 
    </section>
  );
};

import './App.css'
import LabTabs from './components/Tabules';


export const App = () => {


  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Тут можна додати логіку відправки на сервер
  };

  
  return (
    
    <section>
      <LabTabs onSubmit={handleSubmit} /> 
    </section>
  );
};

import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Form, Formik } from 'formik';
import TitleAndClientSection from './TitleAndClientSection';
import { projectInitialValue, projectValidation } from '@/Data/Application/ProjectList/ProjectList';
import ProjectSection from './ProjectSection';
import DateSection from './DateSection';
import DescriptionSection from './DescriptionSection';
import UploadProjectFile from './UploadProjectFile';
import ButtonSection from './ButtonSection';
import { ProjectInitialValue } from '@/Type/Application/ProjectList/ProjectList';
import { setCreatedData } from '@/Redux/Reducers/ProjectSlice';
import { useRouter } from 'next/navigation';

const CreateNewProjectForm = () => {
    const router = useRouter(); 
    const { createdFormData } = useAppSelector((state) => state.project);
    const dispatch = useAppDispatch();
    const randomValue = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  
    const projectSubmit = (values: ProjectInitialValue) => {
      const submittedData = {
        id: randomValue.toString(),
        title: values.title,
        badge: values.title,
        image: "3.jpg",
        sites: "Themeforest, australia",
        description: values.description,
        issue: randomValue.toString(),
        resolved: randomValue.toString(),
        comment: randomValue.toString(),
        like: randomValue.toString(),
        customers_image1: "3.jpg",
        customers_image2: "5.jpg",
        customers_image3: "1.jpg",
        progress:values.progress,
        projectLevel:values.progress,
        color:"primary"
      };
      dispatch(setCreatedData([...createdFormData, submittedData]));
      router.push(`/project/projectlist`);
    };
    return (
      <Formik initialValues={projectInitialValue} validationSchema={projectValidation} onSubmit={projectSubmit}>
        {() => (
          <Form className="theme-form">
            <TitleAndClientSection />
            <ProjectSection />
            <DateSection />
            <DescriptionSection />
            <UploadProjectFile/>
            <ButtonSection />
          </Form>
        )}
      </Formik>
    )
}

export default CreateNewProjectForm
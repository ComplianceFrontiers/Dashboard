import { Badge, Col, Progress } from 'reactstrap';
import { Done, ImagePath } from '@/Constant';
import ProjectDetails from './ProjectDetails';
import ProjectCustomers from './ProjectCustomers';
import Image from 'next/image';
import Link from 'next/link';
import { CommonProjectInterFace } from '@/Type/Application/ProjectList/ProjectList';
import { FaGithub ,FaDatabase} from 'react-icons/fa';
const ProjectCommon: React.FC<CommonProjectInterFace> = ({ item }) => {
  return (
    <Col xxl="4" md="6">
      <div className={`project-box font-dark bg-light-${item.badge === 'Done' ? 'success' : 'danger'}`}>
        <Link href={item.admin}>
          <Badge color={`${item.badge === 'Done' ? 'success' : 'danger'}`}>{item.badge}</Badge>
        </Link>
        <h5 className="f-w-500 mb-2">
          <Link href={item.sites} className="text-decoration-none text-dark">
            {item.title}
          </Link>
        </h5>
        
        <div className="d-flex mb-2">
          
          <Link href={item.sites} className="font-light text-decoration-none text-dark">
            {item.sites}
          </Link>
        </div>
        <div className="d-flex gap-3 mt-4 mb-4">
          <div className="box p-3 bg-light border rounded w-50 text-center">
            <Link href={item.git_frontend} className="text-decoration-none text-dark d-flex align-items-center justify-content-center gap-2">
              <FaGithub size={20} />
              <h6 className="mb-0">Frontend</h6>
            </Link>
          </div>
          <div className="box p-3 bg-light border rounded w-50 text-center">
            <Link href={item.git_backend} className="text-decoration-none text-dark d-flex align-items-center justify-content-center gap-2">
              <FaGithub size={20} />
              <h6 className="mb-0">Backend</h6>
            </Link>
          </div>
        </div>
        <div className="box p-3 bg-light border rounded w-50 text-center">
            <Link href={item.database} className="text-decoration-none text-dark d-flex align-items-center justify-content-center gap-2">
            <FaDatabase size={20} />
              <h6 className="mb-0">Database</h6>
              </Link>
        </div>
        <p>{item.description}</p>
      
        <div className="project-status align-items-center gap-1 mt-4">
          <div className="d-flex mb-2 gap-1">
            <p className="mb-0">{item.progress}% </p>
            <span>{Done}</span>
          </div>
          <Progress
            animated
            color={item.progress === 100 ? 'success' : 'danger'}
            value={item.progress}
            style={{ height: '5px' }}
          />
        </div>
      </div>
    </Col>
  );
};

export default ProjectCommon;

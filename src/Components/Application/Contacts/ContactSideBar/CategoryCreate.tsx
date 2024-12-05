import { Button } from "reactstrap";

interface CategoryCreateProps {
  onEmailFilter: () => void; // Prop to handle filtering
}

const CategoryCreate: React.FC<CategoryCreateProps> = ({ onEmailFilter }) => {
  return (
    <Button
  color="transparent"
  className="btn-category"
  onClick={onEmailFilter} // Trigger the filter function when clicked
>
  <span className="title txt-primary f-w-600">Email</span>
</Button>

  );
};

export default CategoryCreate;

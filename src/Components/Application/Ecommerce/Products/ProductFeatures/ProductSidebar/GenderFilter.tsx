import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { Input, Label } from 'reactstrap';
import { filterGender, removeGender } from '@/Redux/Reducers/FilterSlice';
import { getGender } from '@/utils/Ecommerce.service';

const GenderFilter = () => {
  const { productItem } = useAppSelector((state) => state.product);
  const gender = getGender(productItem);
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.filterData);

  const ClickCategory = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked === true) {
      dispatch(filterGender(e.target.value));
    } else {
      dispatch(removeGender(e.target.value));
    }
  };
  return (
    <div className="checkbox-animated mt-0">
      {gender.map((item, i) => (
        <Label className="d-block" key={i}>
          <Input className="checkbox-primary" defaultChecked={filter.brand.includes(item) ? true : false} type="checkbox" name="name" value={item} onChange={ClickCategory} />
          {item}
        </Label>
      ))}
    </div>
  )
}

export default GenderFilter
'use client';

import { useState } from 'react';
import { useArrayEvery } from './useArrayEvery';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

type Person = {
  id: number;
  name: string;
  age: number;
};

const initialList: Person[] = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
  { id: 4, name: 'Dave', age: 40 },
  { id: 5, name: 'Eve', age: 45 },
];

const ArrayEveryDemo = () => {
  const [list, setList] = useState<Person[]>(initialList);
  const [ageThreshold, setAgeThreshold] = useState<number>(18);

  const isEveryPersonAboveAge = useArrayEvery(
    list,
    (person) => person.age >= ageThreshold,
  );

  const handlePersonChange = (id: number, checked: boolean) => {
    if (checked) {
      const person = initialList.find((p) => p.id === id);
      if (person) {
        setList([...list, person]);
      }
    } else {
      setList(list.filter((p) => p.id !== id));
    }
  };

  const handleAgeThresholdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAgeThreshold(Number(event.target.value));
  };

  const getFirstPersonBelowThreshold = (): Person | undefined => {
    return list.find((person) => person.age < ageThreshold);
  };

  const firstPersonBelowThreshold = getFirstPersonBelowThreshold();

  return (
    <div className="border rounded-lg p-[2em] relative mb-[10px] transition-colors">
      <div className="mb-4">
        <Label htmlFor="ageThreshold" className="block mb-2 font-bold">
          Age Threshold:
        </Label>
        <Input
          id="ageThreshold"
          type="number"
          value={ageThreshold}
          onChange={handleAgeThresholdChange}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">People:</h2>
        <ul>
          {initialList.map((person) => (
            <li key={person.id} className="flex items-center mb-2">
              <Label htmlFor="persons">
                {person.name} ({person.age})
              </Label>
              <Checkbox
                id="persons"
                checked={initialList.some((p) => p.id === person.id)}
                onChange={(e: { target: { checked: boolean } }) =>
                  handlePersonChange(person.id, e.target.checked)
                }
                className="mr-2"
              />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Result:</h2>
        <p>
          Is every person above the age of {ageThreshold}?{' '}
          <strong>{isEveryPersonAboveAge ? 'Yes' : 'No'}</strong>
        </p>
        {!isEveryPersonAboveAge && firstPersonBelowThreshold && (
          <p>
            The first person below the threshold is{' '}
            <strong>
              {firstPersonBelowThreshold.name} (age{' '}
              {firstPersonBelowThreshold.age})
            </strong>
            , who is{' '}
            <strong>
              {ageThreshold - firstPersonBelowThreshold.age} years below the
              threshold.
            </strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default ArrayEveryDemo;
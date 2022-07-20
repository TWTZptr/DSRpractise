export type Pet = {
  id: number;
  breed: string;
  name: string;
  photo: string;
  info: string;
  ownerId: number;
  typeId: number;
  petType: {
    id: number;
    name: string;
  };
};

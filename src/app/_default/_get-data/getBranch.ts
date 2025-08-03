import axios from "axios";

interface Branch {
  id: string;
  name: string;
  address: string;
  isDeleted: boolean;
}

interface BranchResponse {
  data: Branch[];
}

const getBranch = async (): Promise<Branch[]> => {
  const result = await axios.get<BranchResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_V1}/branch`
  );
  return result.data.data;
};

export default getBranch;

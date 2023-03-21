import { Environment } from "vitest";

export default <Environment> {
  name: 'prisma',
  async setup(){
    console.log('executed');
    
    return{
      teardown(){},
    }
  },
}
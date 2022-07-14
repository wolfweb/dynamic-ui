import type { Router } from 'vue-router';
import { useSchemaStore } from '@/store/modules/schemaStore';
import { SchemaMode } from '@/enums/schemaMode';

export function setupRouterGuard(router: Router){
  createPageGuard(router)
}

function createPageGuard(router: Router) {
  const schemaStore = useSchemaStore();
  router.beforeEach(async (to)=>{
    schemaStore.setMode( to.meta.mode as SchemaMode );
  })

  router.afterEach((to)=>{
    console.log(to)
  })
}
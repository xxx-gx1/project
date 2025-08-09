import Mock from 'mockjs'

export default [
    {
    url: '/api/search',
    method: 'get',
    timeout: 1000,
    response: (req,res) => {
        // ?keyword=蔡徐坤
        const keyword = req.query.keyword;
        let num = Math.floor(Math.random() * 10) + 1;
        let list = [];
        for(let i = 0; i < num; i++){
            // 随机内容
            const randomData = Mock.mock({
                title: '@ctitle(3,6)'
            })
            console.log(randomData);
            list.push(`${randomData.title}${keyword}`);
        }

        return {
            code: 0,
            data: list
        }
    }
},
{
    url: '/api/hotlist',
    method: 'get',
    timeout: 1000,
    response: (req,res) => {
        return {
            code: 0,
            data: [{
                id: '101',
                city: '北京'
            },{
                id: '102',
                city: '上海'
            },{
                id: '103',
                city: '广州'
            }]
        }
    }
},
{
    url: '/api/detail/:id',
    method: 'get',
    timeout: 1000,
    response: (req, res) => {
        const randomData = Mock.mock({
            title: '@ctitle(5, 10)',
            price: '@integer(60, 100)',
            desc: '@cparagraph(10,30)',
            images: [
                {
                    url: '@image(300x200,@color, #fff, 图片)',
                    alt: '@ctitle(5, 10)'
                },
                {
                    url: '@image(300x200,@color, #fff, 图片)',
                    alt: '@ctitle(5, 10)'
                },
                {
                    url: '@image(300x200,@color, #fff, 图片)',
                    alt: '@ctitle(5, 10)'
                },
            ]
        })

        return {
            code: 0,
            data: randomData
        }
    }
},
{
    // ?page=1 queryString
    url: '/api/images',
    method: 'get',
    timeout: 1000,
    response: ({query}) => {
        const page = Number(query.page) || 1;
        return {
            code: 0,
            data: getImages(page)
        }
    }
},
{
    url: '/api/stories', // 修复URL路径格式
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
        const page = Number(query.page) || 1;
        // 生成故事数据（包含图片、标题、描述等完整字段）
        const stories = Mock.mock({
            'list|8': [{
                'id|+1': page * 100,
                'title': '@ctitle(5, 10)',
                'desc': '@cparagraph(3, 5)',
                'image': '@image(300x400, @color, #fff, 故事封面)',
                'duration': '@integer(10, 30)分钟',
                'height': '@integer(150, 200)',
                'content': '@cparagraph(100, 200)',
                'category': '@pick(["童话", "冒险", "科普", "成长", "友情"])' 
            }]
        });
        return {
            code: 0,
            data: stories.list // 确保返回数据在data字段中
        };
    }
},
{
    url:'/api/upload-avatar',
    method:'post',
    timeout:1000,
    response:({body}) => {
        return {
            code:0,
            data:{
                url:body.avatar
            }
        }
    }
}
]